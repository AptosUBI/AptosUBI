module ubi_contract::ubi {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::timestamp;
    use aptos_std::table::{Self, Table};

    /// Errors
    const E_NOT_INITIALIZED: u64 = 1;
    const E_ALREADY_REGISTERED: u64 = 2;
    const E_NOT_REGISTERED: u64 = 3;
    const E_NOT_ADMIN: u64 = 4;
    const E_INSUFFICIENT_BALANCE: u64 = 5;
    const E_TOO_EARLY_TO_CLAIM: u64 = 6;

    /// Struct to hold UBI configuration
    struct UBIConfig has key {
        admin: address,
        payment_amount: u64,
        payment_period: u64,
        participants: Table<address, Participant>,
    }

    /// Struct to hold participant information
    struct Participant has store {
        last_claim_time: u64,
    }

    /// Initialize the UBI contract
    public entry fun initialize(account: &signer, payment_amount: u64, payment_period: u64) {
        let admin_address = signer::address_of(account);

        assert!(!exists<UBIConfig>(admin_address), E_ALREADY_REGISTERED);

        let ubi_config = UBIConfig {
            admin: admin_address,
            payment_amount,
            payment_period,
            participants: table::new(),
        };

        move_to(account, ubi_config);
    }

    /// Register a new participant
    public entry fun register(account: &signer) acquires UBIConfig {
        let participant_address = signer::address_of(account);
        let ubi_config = borrow_global_mut<UBIConfig>(@ubi_contract);

        assert!(!table::contains(&ubi_config.participants, participant_address), E_ALREADY_REGISTERED);

        let participant = Participant {
            last_claim_time: timestamp::now_seconds(),
        };

        table::add(&mut ubi_config.participants, participant_address, participant);
    }

    /// Claim UBI payment
    public entry fun claim_payment(account: &signer) acquires UBIConfig {
        let participant_address = signer::address_of(account);
        let ubi_config = borrow_global_mut<UBIConfig>(@ubi_contract);

        assert!(table::contains(&ubi_config.participants, participant_address), E_NOT_REGISTERED);

        let participant = table::borrow_mut(&mut ubi_config.participants, participant_address);
        let current_time = timestamp::now_seconds();

        assert!(current_time >= participant.last_claim_time + ubi_config.payment_period, E_TOO_EARLY_TO_CLAIM);

        // For simplicity, we're just updating the last claim time
        // In later phrases, we must integrate with some real UBI funding sources
        participant.last_claim_time = current_time;

        // This is a placeholder to transfer UBI payment to the participant. Will implement actual coin transfer logic later
        // coin::transfer<AptosCoin>(ubi_config.admin, participant_address, ubi_config.payment_amount);
    }

    /// Update UBI configuration (admin only)
    public entry fun update_config(
        account: &signer,
        new_payment_amount: u64,
        new_payment_period: u64
    ) acquires UBIConfig {
        let admin_address = signer::address_of(account);
        let ubi_config = borrow_global_mut<UBIConfig>(@ubi_contract);

        assert!(admin_address == ubi_config.admin, E_NOT_ADMIN);

        ubi_config.payment_amount = new_payment_amount;
        ubi_config.payment_period = new_payment_period;
    }
}